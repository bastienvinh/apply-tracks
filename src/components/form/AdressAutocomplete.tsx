import { AddressService, Feature } from "@/services/address"
import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MapPin } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command"

export type AddressAutoComleteAddress = {
  id: string
  address1: string
  address2?: string
  postalCode: string
  city: string
  country: string
  state: string
}

type AdressAutocompleteProps = {
  onSelect?: (address: AddressAutoComleteAddress) => void
  value?: string
  onBlur?: () => void
  onChange?: (value: string) => void
  ariaInvalid?: boolean
}

export function AdressAutocomplete({ onSelect, value, onBlur, onChange, ariaInvalid }: AdressAutocompleteProps) {

  const [address, setAddress] = useState<string>(value ?? "")
  const [suggestions, setSuggestions] = useState<Feature[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchSuggestions() {
      const res = await AddressService.getAddressSuggestions(address)
      setSuggestions(res)
    }

    fetchSuggestions()
  }, [address])

  useEffect(() => {
    if (open) {
      // allow the popover/content to mount before focusing
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  function onChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value)

    if (e.target.value.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }

    if (onChange) {
      onChange(e.target.value)
    }
  }

  function onSelectAddress(feature: Feature) {
    setAddress(feature.properties.name ?? "")
    setOpen(false)

    // {
    //             "label": "7 Rue de la Paix 50100 Cherbourg-en-Cotentin",
    //             "score": 0.9797345454545453,
    //             "housenumber": "7",
    //             "id": "50129_2638_00007",
    //             "banId": "d71baae1-79be-4e11-814c-471dc5668157",
    //             "name": "7 Rue de la Paix",
    //             "postcode": "50100",
    //             "citycode": "50129",
    //             "oldcitycode": "50173",
    //             "x": 364275.32,
    //             "y": 6959751.4,
    //             "city": "Cherbourg-en-Cotentin",
    //             "oldcity": "Équeurdreville-Hainneville",
    //             "context": "50, Manche, Normandie",
    //             "type": "housenumber",
    //             "importance": 0.77708,
    //             "street": "Rue de la Paix",
    //             "_type": "address"
    //         }


    if (feature.properties) {
      const [n, state, region] = feature.properties.context?.split(", ").reverse() ?? []

      const address: AddressAutoComleteAddress = {
        id: feature.properties.id!,
        address1: feature.properties.name ?? "",
        postalCode: feature.properties.postcode ?? "",
        city: feature.properties.city ?? "",
        country: "France",
        state,
      }

      if (onSelect) {
        onSelect(address)
      }
    }
  }

  return <div>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Click to see addresses or start typing..."
            value={address}
            onChange={onChangeAddress}
            onBlur={onBlur}
            autoComplete="off"
            aria-invalid={ariaInvalid}
            className="pl-9"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="`w-(--radix-popover-trigger-width)` p-0" align="start">
        <Command>
          <CommandList>
            {suggestions.length === 0 ? (
              <CommandEmpty>Aucune adresse trouvée.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.properties.id}
                    value={suggestion.properties.name}
                    onSelect={() => onSelectAddress(suggestion)}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{suggestion.properties.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
}