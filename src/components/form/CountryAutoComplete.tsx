// import { CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk"
import { MapPin } from "lucide-react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEffect, useRef, useState } from "react"
import { CountryService } from "@/services/country"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command"

type AdressAutocompleteProps = {
  // onSelect?: (address: AddressAutoComleteAddress) => void
  value?: string
  onBlur?: () => void
  onChange?: (value: string) => void
  ariaInvalid?: boolean
}

export function CountryAutoComplete({ onChange, value, onBlur, ariaInvalid }: AdressAutocompleteProps) {

  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [country, setCountry] = useState(value ?? "")

  const suggestions = CountryService.getByName(country)

  function onChangeCountry(e: React.ChangeEvent<HTMLInputElement>) {
    setCountry(e.target.value)

    if (e.target.value.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }

    if (onChange) {
      onChange(e.target.value)
    }
  }

  useEffect(() => {
    if (open) {
      // allow the popover/content to mount before focusing
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  function onSelectCountry(name: string) {
    setCountry(name)
    setOpen(false)

    if (onChange) {
      onChange(name)
    }
  }

  return <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Click to see addresses or start typing..."
            value={country}
            onChange={onChangeCountry}
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
                    key={suggestion.code}
                    value={suggestion.name}
                    onSelect={() => onSelectCountry(suggestion.name)}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{suggestion.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
}