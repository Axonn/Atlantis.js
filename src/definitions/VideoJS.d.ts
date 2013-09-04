declare module _V_ {
    function plugin(name: string, plugin: (options: any) => void ): void;

    export interface IComponent {
        id();
        dispose();
        createEl(type, props): any;
        el();
        addChild(child);
        addChild(child, options);
        children(): any[];
        on(type, fn: () => void );
        off(type, fn: () => void );
        one(type, fn: () => void );
        trigger(type, event?: any);
        show();
        hide();
        width();
        height();
        dimensions(width: number, height: number);
        lockShowing();
        unlockShowing();
        options();
    }

    export class Component implements IComponent {
        constructor(player: any, options?: any);
        id();
        dispose();
        createEl(type, props) : any;
        el();
        addChild(child);
        addChild(child, options);
        children(): any[];
        on(type, fn: () => void );
        off(type, fn: () => void );
        one(type, fn: () => void );
        trigger(type, event?: any);
        show();
        hide();
        width();
        height();
        dimensions(width: number, height: number);
        lockShowing();
        unlockShowing();
        options();
    }

    export class Menu extends Component {
        addItem(component);
    }

    export class MenuItem extends Component {
        constructor(player: any, options:any);
    }

    export class Button extends Component {
    }

    export interface IPlayer extends IComponent {
        play();
        currentTime(time? : string);
        src(source?: string);
        techName;
        currentSrc();
        duration(time?: number);
    }

    export class Player extends Component implements IPlayer{
        play();
        currentTime();
        src(source?: string);
        techName;
        currentSrc();
        duration();
    }
}