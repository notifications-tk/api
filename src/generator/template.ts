import { ImageGeneratorParams } from "./parameters";

export const renderTemplate = (params: ImageGeneratorParams): string =>
    `<div class="notification">
        <i class="fa fa-${params.icon}"></i>
        ${params.text}
    </div>

    <style>
        @import url("//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

        .notification {
            margin: 10px 0px;
            padding: 12px;
            width: ${params.width == "fit-content" ? "fit-content" : params.width + "px"};

            color: #${params.foregroundColor};
            background-color: #${params.backgroundColor};
            border: 1px solid #${params.borderColor};
            border-radius: ${params.borderRadius}px;
        }

        .notification i {
            margin: 10px 22px;
            font-size: 2em;
            vertical-align: middle;
        }
    </style>`;