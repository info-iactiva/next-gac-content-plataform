export interface UserProtected {
    id: string;
    is_active: boolean;
    rol:string;
    plan: string;
    is_pagado: boolean;
    tokens_restantes: number;
}