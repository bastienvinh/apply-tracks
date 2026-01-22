import { useForm } from "@tanstack/react-form"
import z from "zod"
import { toast } from "sonner"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { useNavigate } from "react-router"
import { companiesRoute } from "@/routes"
import { CompanySize } from "@/services/companies"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export const companySchema = z.object({
  id: z.uuidv4().optional().nullable(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  website: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  notes: z.string().nullable(),
  company_size: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']),
  glassdoor_url: z.string().nullable(),
})

interface CompanyFormProps {
  className?: string
  data?: any // Replace with your Company type if available
}

export function CompanyForm({ className, data }: CompanyFormProps) {
  const navigate = useNavigate()
  // const { mutateAsync: createCompany } = useCreateCompany()
  // const { mutateAsync: updateCompany } = useUpdateCompany()

  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      website: data?.website ?? "",
      location: data?.location ?? "",
      notes: data?.notes ?? "",
      company_size: data?.company_size ?? "small",
      glassdoor_url: data?.glassdoor_url ?? "",
      id: data?.id ?? null,
    } as z.infer<typeof companySchema>,
    validators: {
      onSubmit: companySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        toast.success(`Entreprise enregistrée: ${value.name}`)
        console.log("Submitted company:", value)
        navigate(companiesRoute())
      } catch (error) {
        toast.error("Une erreur est survenue lors de l'enregistrement de l'entreprise.")
      }
    },
  })

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
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  type="url"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="location">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Localisation</FieldLabel>
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
                <Input
                  id={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  type="url"
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