
import bcryptjs from 'bcryptjs'

export interface SeedLink {
    url: string;
    shortUrl: string;
    clicks: number;
    user?: string | undefined;
    userId?: string | undefined;
    qr: string;
    limit?: number | undefined;
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

export interface SeedPlan {
    name: Plan;
    price: number;
    limit: number | undefined;
}

export interface SeedCode {
    name: string
    discount: number
}

type Plan = 'free' | 'basico' | 'popular' | 'super';

interface SeedData {
    links: SeedLink[];
    users: SeedUser[];
    plans: SeedPlan[];
    codes: SeedCode[];
}



export const initialData: SeedData = {
    links: [
        {
            url: 'https://github.com/Ezequielz/shortZED',
            shortUrl: 'github',
            clicks: 0,
            limit: undefined,
            qr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOcSURBVO3BQY7kSAIDQWcg//9l3zrMgScBgpQ10700iz+Y+cdhphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmfHgoCb9J5UoS7lC5koSmckcSfpPKE4eZcpgph5ny4WUqb0rCEyotCS0JV1RaEprKHSpvSsKbDjPlMFMOM+XDlyXhDpU7ktBUnlBpSWgqb0rCHSrfdJgph5lymCkf/s+ptCQ0lStJaCp/ssNMOcyUw0z58JdJwhMqLQlNpan8TQ4z5TBTDjPlw5ep/MlUWhKayhMq/yWHmXKYKYeZ8uFlSfg3qbQkNJWWhKbSktBUWhKaypUk/JcdZsphphxmyoeHVP7LVFoS7lBpSbhD5U9ymCmHmXKYKR8eSkJTaUl4k0pTuUOlJaEloak8kYQ3qXzTYaYcZsphpsQfvCgJV1SuJKGpXElCU2lJaCp3JKGptCQ0lStJaCp3JKGpvOkwUw4z5TBT4g8eSEJTuSMJT6i0JDyhciUJV1RaEp5QaUm4ovLEYaYcZsphpsQfvCgJTaUloak8kYQrKr8pCU2lJeGKyh1JaCpPHGbKYaYcZkr8wYuS8E0qV5JwRaUl4YpKS8ITKi0JTaUl4Q6VJw4z5TBTDjMl/uCBJDSVloSmciUJTeXflISm0pLQVK4koam0JDSVloSm8qbDTDnMlMNM+fAvS0JTaUm4onJHEq6oNJWWhDuS0FTelISm8sRhphxmymGmfPhlSWgqLQlN5YkkXFG5Q6UloSXhShKeUGlJeNNhphxmymGmfPhlKldUWhKuqFxRaUloSbii8ptUWhKaSlN502GmHGbKYabEH/zBktBUWhKaSkvCFZWWhCsqdyThDpVvOsyUw0w5zJQPDyXhN6k0lW9KQlNpSbiShKbyRBKuqDxxmCmHmXKYKR9epvKmJFxJQlNpKi0JV1RaEp5QeUKlJeGbDjPlMFMOM+XDlyXhDpVvUmlJaEm4koQrSXhTEprKNx1mymGmHGbKh79MEppKS0JTaUm4Q6Ul4YpKS0JTaUloSbii8sRhphxmymGmfPjLJaGptCRcUWlJaEloKleS0FTuUGlJeNNhphxmymGmfPgylW9SaUloKldU3pSEpnIlCVdUftNhphxmymGmfHhZEn5TEprKHUm4Q+WOJDyRhN90mCmHmXKYKfEHM/84zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlP8BQmKnBCVIZjwAAAAASUVORK5CYII='
        },
        {
            url: 'https://nextjs.org/',
            shortUrl: 'next',
            clicks: 0,
            qr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOfSURBVO3BQY4kRwIDQWeg/v9l3znowFMAiaxuSSuaxT+Y+cthphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmfHgpCb9JpSWhqdwkoam0JDSVmyQ0lZaE36TyxmGmHGbKYaZ8+DKVb0rCb1JpSWgqTeUJlW9KwjcdZsphphxmyocfloQnVN5Iwo1KS8IbSWgqTyThCZWfdJgph5lymCkf/uVUWhKaSktCU2lJuElCU/l/cpgph5lymCkf/uWS8IRKS0JT+S87zJTDTDnMlA8/TOUnqdwk4UbljSQ0lSdU/kkOM+UwUw4z5cOXJeE3JaGp3Ki0JDSVloSm8kYS/skOM+UwUw4zJf7Bf0gS3lBpSWgq/2aHmXKYKYeZ8uGlJDSVmyT8JpWm0pLQVG6S0FRaEprKTRKaSkvCEypvHGbKYaYcZsqHl1RaEt5QuUnCjcrfSeUmCTdJeELlmw4z5TBTDjPlww9TaUl4Igk3KjdJaCpPJOEmCW+otCQ0lZskNJU3DjPlMFMOMyX+wQtJaCpvJKGp3CShqdwkoak8kYQblZsk/CSVNw4z5TBTDjPlw0sqN0loKi0JN0m4UWlJaCo3SWgqLQk3KjdJuFF5IwnfdJgph5lymCnxD15IQlNpSbhRaUloKi0JTeUmCU3lJglNpSXhRuWJJDSVmyQ0lW86zJTDTDnMlA9floQ3VFoSmkpLQlNpKi0J36Ryk4QblZaEJ5LQVN44zJTDTDnMlA9fpvJEEm5UWhJuktBUblRukvBEEt5QaUloKi0J33SYKYeZcpgpH35YEm5UbpJwo9KScKPSkvCESkvCG0loKjdJaCrfdJgph5lymCkfXlK5UXlD5SYJTaUl4Q2VJ1SeSMKNSkvCTzrMlMNMOcyUDy8l4TepPKHSknCj8k1JaCo3SWgqTaUloam8cZgph5lymCkfvkzlm5LwRhKayk0SmkpLwhMqT6jcJOEnHWbKYaYcZsqHH5aEJ1T+TiotCU8k4Y0kNJWm8pMOM+UwUw4z5cN/TBJuVJrKTRKeULlJwk0SblTeOMyUw0w5zJQP/3Iqb6i0JHyTSkvCjUpLwm86zJTDTDnMlA8/TOU3JeENlZaEpvL/7DBTDjPlMFM+fFkSflMSblRuktBUmspNEp5QuUlCU7lJwjcdZsphphxmSvyDmb8cZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmyv8AjfKeFoWaC3gAAAAASUVORK5CYII='
        },
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
    ],
    plans: [
        {
            name: 'free',
            price: 0,
            limit: 10,
        },
        {
            name: 'basico',
            price: 10,
            limit: 100,
        },
        {
            name: 'popular',
            price: 20,
            limit: 300
        },
        {
            name: 'super',
            price: 50,
            limit: undefined
        }
    ],
    codes: [
        {
            name: 'el10',
            discount: 10,
        },
        {
            name: 'el20',
            discount: 20,
        },
    ]
}