

// create type
export type TUser= {
    id : string;
    password : string;
    needsPasswordChange : boolean;
    role : 'admin' | 'faculty' | 'student';
    status : 'in-progress' | 'blocked',
    isDeleted : boolean
}

export type TNewUser={
    password : string;
    role : string,
    id : string
}