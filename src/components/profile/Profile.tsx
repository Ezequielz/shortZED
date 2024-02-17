
type Role = "user" | "admin"

interface Props {
    user: {
        // id: string;
        name: string | null;
        email: string | null;
        // password: string | null;
        roles: Role;
        isActive: boolean;
        emailVerified: Date | null;
        image: string | null;
    } | undefined
}
export const Profile = ({ user }: Props) => {
    
    return (
        <>
            {
                JSON.stringify({user})
            }
        </>
    )
}
