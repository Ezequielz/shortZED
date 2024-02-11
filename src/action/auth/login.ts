'use server'

import { signIn } from '@/auth.config';
import { BuiltInProviderType } from 'next-auth/providers';
import { LiteralUnion, SignInOptions, SignInAuthorizationParams} from 'next-auth/react';


export const login = async (email: string, password: string) => {

  try {
    await signIn('credentials', { email, password, redirect: false });
    return {
      ok: true,
      message: 'Login exitoso, redirigiendo a la página principal'
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Email o contraseña incorrectas'
    }
  }

}


export const providerLogin = async (
  provider?: LiteralUnion<BuiltInProviderType> | undefined,
  options?: SignInOptions | undefined,
  authorizationParams?: SignInAuthorizationParams | undefined
) => {
  try {
    
  
    return signIn(provider, options, authorizationParams);
    
  } catch (error) {
      console.log(error)

      return undefined
  }

};