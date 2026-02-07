import { useForm } from "@tanstack/react-form"
import z from "zod"
import { toast } from "sonner"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { useNavigate } from "react-router"
import { companiesRoute } from "@/routes"
import { Company, CompanySize } from "@/services/companies"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCreateCompany } from "../hooks/use-companies-mutation"
import { AdressAutocomplete } from "@/components/form/AdressAutocomplete"
import { CountryAutoComplete } from "@/components/form/CountryAutoComplete"
import { useState } from "react"

export const companySchema = z.object({
  id: z.uuidv4().optional().nullable(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  website: z.url().optional().nullable(),
  address_line1: z.string().optional().nullable(),
  address_line2: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state_province: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  company_size: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']),
  glassdoor_url: z.url().optional().nullable(),
  linkedin_url: z.url().optional().nullable(),
  twitter_url: z.url().optional().nullable(),
  siret: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  is_default: z.boolean().optional().nullable(),
})

interface CompanyFormProps {
  className?: string
  data?: any // Replace with your Company type if available
}

export function CompanyForm({ className, data }: CompanyFormProps) {
  const navigate = useNavigate()
  const { mutateAsync: createCompany } = useCreateCompany()

  const [selectedCountry, setSelectedCountry] = useState<string>(data?.country ?? "France")

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      website: data?.website ?? null,
      address_line1: data?.address_line1 ?? null,
      address_line2: data?.address_line2 ?? null,
      postal_code: data?.postal_code ?? null,
      city: data?.city ?? null,
      state_province: data?.state_province ?? null,
      country: selectedCountry,
      notes: data?.notes ?? null,
      company_size: data?.company_size ?? "small",
      glassdoor_url: data?.glassdoor_url ?? null,
      linkedin_url: data?.linkedin_url ?? null,
      twitter_url: data?.twitter_url ?? null,
      siret: data?.siret ?? null,
      is_default: data?.is_default ?? false,
      id: data?.id ?? null,
    } as z.infer<typeof companySchema>,
    validators: {
      onSubmit: companySchema,
    },
    onSubmit: async ({ value }) => {
      try {

        if (value.id) {

        } else {
          console.log("Creating company with value:", value)
          // Be careful with the type assertion here
          await createCompany(value as Partial<Company>)
        }

        toast.success(`Entreprise enregistrée: ${value.name}`)
        navigate(companiesRoute())
      } catch (error) {
        toast.error("Une erreur est survenue lors de l'enregistrement de l'entreprise.")
      }
    },
  })

  function handleWebsite(propertyName: string, website: string) {
    form.setFieldValue(propertyName as keyof z.infer<typeof companySchema>, website ? `https://${website.replace(/^https?:\/\//, "")}` : "")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={className}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Nom <span className="text-sm">(Obligatoire)</span>
                </FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="website">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Site web</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="text-white">https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput value={field.state.value?.replace(/^https?:\/\//, "") ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => handleWebsite(field.name, e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    autoComplete="off" placeholder="example.com" className="pl-0.5!" />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="country">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Pays</FieldLabel>
                <CountryAutoComplete value={field.state.value ?? ""} onChange={(value) => { field.handleChange(value); setSelectedCountry(value) }} onBlur={field.handleBlur} ariaInvalid={isInvalid} />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        {selectedCountry === "France" && (
          <form.Field name="address_line1">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Adresse (ligne 1)</FieldLabel>
                  <AdressAutocomplete
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                    ariaInvalid={isInvalid}
                    onSelect={(address) => {
                      form.setFieldValue("address_line1", address.address1)
                      form.setFieldValue("postal_code", address.postalCode)
                      form.setFieldValue("city", address.city)
                      form.setFieldValue("state_province", address.state)
                      form.setFieldValue("country", address.country)
                    }} />
                </Field>
              )
            }}
          </form.Field>
        )}


        {selectedCountry !== "France" && (
          <form.Field name="address_line1">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Adresse (ligne 1)</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                </Field>
              )
            }}
          </form.Field>
        )}

        <form.Field name="address_line2">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Adresse (ligne 2)</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="postal_code">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Code postal</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="city">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ville</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="state_province">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Région / État</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="notes">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                    className="min-h-24 resize-none"
                    placeholder="📝 ecrivez ce que vous voulez"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value?.length ?? "0"}/500 caractères
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="company_size">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Taille de l'entreprise <span className="text-sm">(Obligatoire)</span>
                </FieldLabel>
                <Select
                  value={field.state.value ?? ""}
                  onValueChange={(val) => field.handleChange(val as CompanySize)}
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="input"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="small">Petite</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="enterprise">Entreprise</SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="glassdoor_url">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Lien Glassdoor</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="text-white">https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput value={field.state.value?.replace(/^https?:\/\//, "") ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => handleWebsite(field.name, e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    autoComplete="off" placeholder="example.com" className="pl-0.5!" />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="linkedin_url">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>LinkedIn</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="text-white">https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput value={field.state.value?.replace(/^https?:\/\//, "") ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => handleWebsite(field.name, e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    autoComplete="off" placeholder="linkedin.com/in/[username]" className="pl-0.5!" />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="twitter_url">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Twitter</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText className="text-white">https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput value={field.state.value?.replace(/^https?:\/\//, "") ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => handleWebsite(field.name, e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    autoComplete="off" placeholder="x.com/[username]" className="pl-0.5!" />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="siret">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>SIRET</FieldLabel>
                <Input
                  id={field.name}
                  maxLength={14}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  placeholder="123 456 789 00012"
                  pattern="^(?:\d{3}\s?\d{3}\s?\d{3}\s?\d{5})?$"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

      </FieldGroup>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => navigate(companiesRoute())} type="button">
          Retour
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  )
}