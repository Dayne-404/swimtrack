export interface InstructorPrivate {
    _id: string,
    name: string,
    avatar?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface InstructorPublic {
    _id: string,
    name: string,
    avatar: {url: string, color: string},
}