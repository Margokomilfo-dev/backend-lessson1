export type  VideoType={
    id: string;
    title: string,//need todo check maxLength
    author: string, //need todo check maxLength
    availableResolutions: string[] | null //need todo enum
}