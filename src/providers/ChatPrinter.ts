export class ChatPrinter
{
    private listener_?: ()=>void;

    public readonly name: string;
    public readonly participants: string[];
    public readonly messages: ChatPrinter.IMessage[];

    //----------------------------------------------------------------
    //  CONSTRUCTOR
    //----------------------------------------------------------------
    public constructor(name: string, participants: string[])
    {
        this.name = name;
        this.participants = participants;
        this.messages = [];
    }

    public assign(listener: ()=>void): void
    {
        this.listener_ = listener;
    }

    private _Inform(): void
    {
        if (this.listener_)
            this.listener_();
    }

    //----------------------------------------------------------------
    //  METHODS FOR REMOTE FUNCTION CALL
    //----------------------------------------------------------------
    protected insert(name: string): void
    {
        this.participants.push(name);
        this._Inform();
    }

    protected erase(name: string): void
    {
        let index: number = this.participants.findIndex(str => str === name);
        if (index !== -1)
            this.participants.splice(index, 1);

        this._Inform();
    }

    protected talk(from: string, content: string): void
    {
        this.messages.push({ 
            from: from, 
            content: content 
        });
        this._Inform();
    }

    protected whisper(from: string, to: string, content: string): void
    {
        this.messages.push({ 
            from: from, 
            to: to,
            content: content 
        });
        this._Inform();
    }
}

export namespace ChatPrinter
{
    export interface IMessage
    {
        from: string;
        content: string;
        to?: string;
    }
}