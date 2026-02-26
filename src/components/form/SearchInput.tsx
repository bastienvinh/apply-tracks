import { useForm } from "@tanstack/react-form"
import { SearchIcon } from "lucide-react"
import z from "zod"
import { Field, FieldDescription } from "../ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group"
import { useGlobalSearch } from "@/hooks/use-global-search"


export interface SearchInputProps {
  prefix?: string
}

export const inputSearchSchema = z.object({
  search_term: z.string()
})

export function SearchInput({ prefix }: SearchInputProps) {

  const { term, setTerm } = useGlobalSearch({ prefix: prefix ?? "" })

  const form = useForm({
    defaultValues: {
      search_term: term ?? ""
    },
    validators: {
      onSubmit: inputSearchSchema
    },
    onSubmit(props) {
      setTerm(props.value.search_term ?? "")
    },
  })

  return (
    <form onSubmit={e => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }} className="flex gap-2">
      <form.Field name="search_term">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return <Field data-invalid={isInvalid} className="max-w-sm">
            <InputGroup>
              <InputGroupInput
                id={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                autoComplete="off"
                value={field.state.value}
                placeholder="Rechercher..." />
              <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        }}
      </form.Field>
    </form>
  )
}