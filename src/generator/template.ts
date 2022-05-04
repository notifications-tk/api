import { ImageGeneratorParams } from "./parameters";

export const renderTemplate = (params: ImageGeneratorParams): string =>
    `
    <style>
        .notification {
            font-family: "Roboto";
            
            margin: 10px 0px;
            padding: 15px;
            width: ${params.width == "fit-content" ? "fit-content" : params.width + "px"};

            color: #${params.foregroundColor};
            background-color: #${params.backgroundColor};
            border: 1px solid #${params.borderColor};
            border-radius: ${params.borderRadius}px;
        }

        .notification i {
            margin: 0 10px;
            font-size: 1.3em;
            vertical-align: middle;
        }
    </style>

    <div class="notification">
        <i class="fa fa-${params.icon}"></i>
        ${params.text}<br>
    </div>`;