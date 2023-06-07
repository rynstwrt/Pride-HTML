/*
 * Pride-HTML
 * "A JS library to create pride-themed text!"
 *
 * Author: Ryan Stewart
 * Date Started: June 05, 2023
 */
class PrideHTML
{
    #flagGradient = ["#e40203", "#ff8b00", "#feed00", "#008026", "#004dff", "#750686"];

    constructor(angle = 135, speed = 1)
    {
        this.angle = angle;
        this.speed = speed;

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

    setSpeed(speed)
    {
        this.speed = speed;
    }

    #colorText(el, gradient)
    {
        el.style.backgroundImage = "linear-gradient(" + this.angle + "deg, " + gradient.join(", ") + ")";
    }

    #convertHEXToHSL(hex)
    {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);

        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min)
        {
            h = s = 0;
        }
        else
        {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch(max)
            {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        s = Math.round(s * 100);
        l = Math.round(l * 100);
        h = Math.round(h * 360);
        return [h, s, l];
    }

    #convertHSLToHEX(h, s, l)
    {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;

        const f = n  =>
        {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };

        return `#${f(0)}${f(8)}${f(4)}`;
    }

    #colorStep(elements)
    {
        this.#flagGradient = this.#flagGradient.map(hex =>
        {
            const hsl = this.#convertHEXToHSL(hex); // [h, s, l]

            let h = hsl[0];
            ++h;
            const s = hsl[1];
            const l = hsl[2];

            return this.#convertHSLToHEX(h, s, l);
        });

        elements.forEach(el => this.#colorText(el, this.#flagGradient));
        requestAnimationFrame(() => this.#colorStep(elements));
    }

    colorTextElement(cssSelector)
    {
        const elements = document.querySelectorAll(cssSelector);
        if (!elements) return;

        elements.forEach(el => {
            el.classList.add("pride-html-gradient")
            this.#colorText(el, this.#flagGradient);
        });

        console.log("A")

        requestAnimationFrame(() => this.#colorStep(elements));
    }
}
