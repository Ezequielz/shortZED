        export const sleep = (number: number) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true)
                }, number * 1000 )
            })
        }