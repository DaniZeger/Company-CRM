export interface User {
    _id?: string | null
    name?: string | null
    email?: string | null
    password?: string | null
    token?: string | null
}

export interface Customer {
    _id?: string | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    address?: string | null
}

export interface Employee {
    _id?: string | null
    name?: string | null | undefined
    phone?: string | null
    email?: string | null
    birthday?: string | null
}