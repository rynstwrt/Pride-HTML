/*
 * Pride-HTML
 * "A JS library to create pride-themed text!"
 *
 * Author: Ryan Stewart
 * Date Started: June 05, 2023
 */


class PrideHtml
{
    #lastShiftTime = 0;
    #gradients = {
        "traditional": ["#e40203", "#ff8b00", "#feed00", "#008026", "#004dff", "#750686"],
        "gilbert-baker": [],
        "philadelphia": [],
        "progress": [],
        "intersex-inclusive-progress": [],
        "queer": []
    };

    constructor(gradientAngle = 135, gradientScale = 1)
    {
        this.angle = gradientAngle;
        this.scale = gradientScale;

        const gradientTextSharedStyle = document.createElement("style");
        gradientTextSharedStyle.textContent = `
            .pride-html-gradient
            {
                background-size: 100%;
            
                background-clip: text;
                -webkit-background-clip: text;
                -moz-background-clip: text;
                
                color: transparent;
                -webkit-text-fill-color: transparent;
                -moz-text-fill-color: transparent;
            }
        `;
        document.head.append(gradientTextSharedStyle);
    }

    setAngle(angle)
    {
        this.angle = angle;
    }

    setScale(scale)
    {
        this.scale = scale;
    }

    colorTextElement(el, flag)
    {
        const gradient = this.#gradients[flag];
        if (!el || !gradient) return;

        el.classList.add("pride-html-gradient");
        el.style.backgroundImage = "linear-gradient(" + this.angle + "deg, " + gradient.join(", ") + ")";
    }
}
