"use client"

import { ReactNode, FormEvent } from "react"

export default function DeleteForm({
    action,
    children,
    message = "Are you sure you want to delete this item? This action cannot be undone."
}: {
    action: string | ((formData: FormData) => void),
    children: ReactNode,
    message?: string
}) {
    return (
        <form
            action={action}
            onSubmit={(e: FormEvent) => {
                if (!window.confirm(message)) {
                    e.preventDefault()
                }
            }}
        >
            {children}
        </form>
    )
}
