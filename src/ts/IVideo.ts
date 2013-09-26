///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
module AtlantisJS {
    export interface IEndOfVideoCallToAction {
        title: string;
        subtitle: string;
        button: {
            text: string;
            link: string;
        }
    }

    export interface IRelatedVideo {
        title: string;
        img: string;
        linkId?: string;
        linkUrl?: string;
    }

    export interface IRelatedVideoOptions {
        title: string;
        items: IRelatedVideo[];
    }

    export interface IEndOfVideoOptions {
        callToAction?: IEndOfVideoCallToAction;
        relatedVideos?: IRelatedVideoOptions
        template?: string;
    }

    export interface IHotspotPosition {
        duration: number;
        path: (percentage: number) => {
            x: number;
            y: number;
        }
    }

    export interface IHotspot {
        start: number;
        position: IHotspotPosition[]
        height: number;
        width: number;
        text: string;
        linkTarget: string;
        linkTemplate?: string;
        linkSplashData?;
        linkUrl?: string;
        template?: string;
    }

    export interface IAnnotation {
        text: string;
        template?: string;
    }

    export interface IPauseCallToAction {
        text: string;
        template?: string;
    }

    export interface ITitle {
        text: string;
        template?: string;
    }

    export interface ILogo {
        src: string;
        link: string;
        template?: string;
    }

    export interface IVideo {
        id: string;
        aspectRatio?: string;
        title?: ITitle;
        sources: VjsPluginComponents.IVideoSource[];
        endOfVideoOptions?: IEndOfVideoOptions;
        hotspots?: IHotspot[];
        annotation?: IAnnotation;
        pauseCallToAction?: IPauseCallToAction;
        overlays?: VjsPluginComponents.IOverlay[];
    }

    export interface IPlayerOptions {
        logo: ILogo;
        overlays?: VjsPluginComponents.IOverlay[];
        resolutionSwitching?: boolean;
        socialSharing?: boolean;
        googleAnalytics?: boolean;
    }

    export interface IPlayerInput {
        videos: IVideo[];
        options?: IPlayerOptions;
    }
}