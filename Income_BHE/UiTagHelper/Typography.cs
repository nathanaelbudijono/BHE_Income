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
        { "sm",  "leading-relaxed text-xs max-w-2xl" },
        { "p",  "leading-relaxed text-sm max-w-3xl" },

        { "h1", "leading-snug tracking-tight  mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-5xl" },
        { "h2", "leading-snug tracking-normal  mx-auto my-6 w-full text-2xl lg:max-w-3xl lg:text-4xl" },
        { "h3", "leading-snug tracking-normal  mx-auto my-6 w-full text-xl max-w-lg lg:max-w-2xl lg:text-3xl" },
        { "h4", "leading-snug tracking-normal  mx-auto my-6 w-full text-lg max-w-md lg:max-w-xl lg:text-2xl" },
        { "h5", "leading-snug tracking-normal  mx-auto my-6 w-full text-base max-w-sm lg:max-w-lg lg:text-xl" },
        { "h6", "leading-snug tracking-normal  mx-auto my-6 w-full text-sm max-w-xs lg:max-w-md lg:text-lg" }
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
