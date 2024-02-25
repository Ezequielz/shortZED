
import bcryptjs from 'bcryptjs'

export interface SeedLink {
    url: string;
    shortUrl: string;
    clicks: number;
    user?: string;
    userId?: string;
    qr: string
}
type Role = 'user' | 'admin';

export interface SeedUser {
    name: string;
    email: string;
    emailVerified?: Date;
    roles?: Role;
    password: string;
    image?: string;
}


interface SeedData {
    links: SeedLink[];
    users: SeedUser[];
}



export const initialData: SeedData = {
    links: [
        {
            url: 'https://github.com/Ezequielz/shortZED',
            shortUrl: 'sd2rf',
            clicks: 0,
            qr:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOcSURBVO3BQY7kSAIDQWcg//9l3zrMgScBgpQ10700iz+Y+cdhphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmfHgoCb9J5UoS7lC5koSmckcSfpPKE4eZcpgph5ny4WUqb0rCEyotCS0JV1RaEprKHSpvSsKbDjPlMFMOM+XDlyXhDpU7ktBUnlBpSWgqb0rCHSrfdJgph5lymCkf/s+ptCQ0lStJaCp/ssNMOcyUw0z58JdJwhMqLQlNpan8TQ4z5TBTDjPlw5ep/MlUWhKayhMq/yWHmXKYKYeZ8uFlSfg3qbQkNJWWhKbSktBUWhKaypUk/JcdZsphphxmyoeHVP7LVFoS7lBpSbhD5U9ymCmHmXKYKR8eSkJTaUl4k0pTuUOlJaEloak8kYQ3qXzTYaYcZsphpsQfvCgJV1SuJKGpXElCU2lJaCp3JKGptCQ0lStJaCp3JKGpvOkwUw4z5TBT4g8eSEJTuSMJT6i0JDyhciUJV1RaEp5QaUm4ovLEYaYcZsphpsQfvCgJTaUloak8kYQrKr8pCU2lJeGKyh1JaCpPHGbKYaYcZkr8wYuS8E0qV5JwRaUl4YpKS8ITKi0JTaUl4Q6VJw4z5TBTDjMl/uCBJDSVloSmciUJTeXflISm0pLQVK4koam0JDSVloSm8qbDTDnMlMNM+fAvS0JTaUm4onJHEq6oNJWWhDuS0FTelISm8sRhphxmymGmfPhlSWgqLQlN5YkkXFG5Q6UloSXhShKeUGlJeNNhphxmymGmfPhlKldUWhKuqFxRaUloSbii8ptUWhKaSlN502GmHGbKYabEH/zBktBUWhKaSkvCFZWWhCsqdyThDpVvOsyUw0w5zJQPDyXhN6k0lW9KQlNpSbiShKbyRBKuqDxxmCmHmXKYKR9epvKmJFxJQlNpKi0JV1RaEp5QeUKlJeGbDjPlMFMOM+XDlyXhDpVvUmlJaEm4koQrSXhTEprKNx1mymGmHGbKh79MEppKS0JTaUm4Q6Ul4YpKS0JTaUloSbii8sRhphxmymGmfPjLJaGptCRcUWlJaEloKleS0FTuUGlJeNNhphxmymGmfPgylW9SaUloKldU3pSEpnIlCVdUftNhphxmymGmfHhZEn5TEprKHUm4Q+WOJDyRhN90mCmHmXKYKfEHM/84zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlP8BQmKnBCVIZjwAAAAASUVORK5CYII='
        }
    ],
    users: [
        {
            name: 'Ezequiel',
            email: 'eze@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Usuario Prueba',
            email: 'user@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Bayron',
            email: 'bay@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Kathy',
            email: 'kat@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
    ]
}