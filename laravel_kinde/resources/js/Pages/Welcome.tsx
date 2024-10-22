import { useForm } from '@inertiajs/react'

export default function Welcome() {
    const form = useForm({
        email: 'thiagoelias99@gmail.com',
    })

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            form.post(route('signIn'), {
                //
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='email' name='email' placeholder='Email'
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

