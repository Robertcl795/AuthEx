import React, { FormEvent } from 'react'
import { reduxForm, Field } from 'redux-form'

interface SignupData extends FormEvent<HTMLFormElement> {
    email: string,
    password: string
}

const SignUpPage = () => {
    const onSubmit = (formData: SignupData) => {
        console.log(formData)
    }
    return (
        <section className='signup__page'>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Email</legend>
                    <Field name='email' type='text' id='email' component='input' label="Enter your email"
                    placeholder="example@example.com"/>
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <Field name='password' type='password' id='password' component='input'/>
                </fieldset>
                <button type="submit">Sign Up</button>
            </form>
        </section>
    )
}

export default reduxForm({ form: 'signup' })(SignUpPage)
