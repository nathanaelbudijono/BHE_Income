using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Runtime.CompilerServices;

namespace Income_BHE.UiTagHelper
{
    [HtmlTargetElement("Typography")]
    public class Typography : TagHelper
    {
        public string Variant { get; set; } = "p";
        public string Font { get; set; } = "regular";
        public string Class { get; set; } = "";
        public string Text { get; set; } = "";
        public string Color { get; set; } = "default";

        private static readonly Dictionary<string, string> VariantClasses = new()
    {
        { "sm",  "leading-relaxed text-xs" },
        { "p",  "leading-relaxed text-sm" },

        { "h1", "leading-snug tracking-tight my-4 w-full text-2xl lg:text-5xl" },
        { "h2", "leading-snug tracking-normal my-4 w-full text-2xl lg:text-4xl" },
        { "h3", "leading-snug tracking-normal my-4 w-full text-xl lg:text-3xl" },
        { "h4", "leading-snug tracking-normal my-4 w-full text-lg lg:text-2xl" },
        { "h5", "leading-snug tracking-normal my-4 w-full text-base lg:text-xl" },
        { "h6", "leading-snug tracking-normal my-4 w-full text-smd lg:text-lg" }
    };

        private static readonly Dictionary<string, string> ColorClasses = new()
        {
            { "default",  "text-slate-500" },
            { "dark" , "text-slate-800"},
            {"semimuted","text-gray-400" },
            { "light" , "text-white"},
            { "primary",  "text-primary-100" },
        };
        private static readonly Dictionary<string, string> FontClasses = new()
        {
            { "thin", "poppins-thin" },
            { "extralight", "poppins-extralight" },
            { "light", "poppins-light" },
            { "regular", "poppins-regular" },
            { "medium", "poppins-medium" },
            { "semibold", "poppins-semibold" },
            { "bold", "poppins-bold" },
            { "extrabold", "poppins-extrabold" },
            { "black", "poppins-black" },

            { "thin-italic", "poppins-thin-italic" },
            { "extralight-italic", "poppins-extralight-italic" },
            { "light-italic", "poppins-light-italic" },
            { "regular-italic", "poppins-regular-italic" },
            { "medium-italic", "poppins-medium-italic" },
            { "semibold-italic", "poppins-semibold-italic" },
            { "bold-italic", "poppins-bold-italic" },
            { "extrabold-italic", "poppins-extrabold-italic" },
            { "black-italic", "poppins-black-italic" }
        };


        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = Variant;

            var baseClass = VariantClasses.ContainsKey(Variant) ? VariantClasses[Variant] : VariantClasses["p"];
            var fontClass = FontClasses.ContainsKey(Font) ? FontClasses[Font] : FontClasses["regular"];
            var colorClass = ColorClasses.ContainsKey(Color) ? ColorClasses[Color] : ColorClasses["default"];


            var finalClass = $"{colorClass} {fontClass} {baseClass} {Class}".Trim();
            output.Attributes.SetAttribute("class", finalClass);

            if (!string.IsNullOrEmpty(Text))
            {
                output.Content.SetContent(Text);
            }
        }
    }
}
