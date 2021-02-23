
import { LoginDto } from '../../models/AuthenticationDto';


export interface LoginFormProps {
    onLogin : (data : LoginDto) => void
    errors? : any
}


export interface LoginScreenViewProps extends LoginFormProps {}

