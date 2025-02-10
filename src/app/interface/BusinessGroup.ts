
export interface BusinessGroup {
    id: string;
    name: string;
    status: boolean;
}

export interface NewBusinessGroup {
    name: string;
    status: boolean;
}

interface Column {
    key: string;
    label: string;
}

interface ListItem {
    id: string;
    name: string;
    status: string;
    [key: string]: string;
}