import { createElement as _} from "./Util/Element";

export default function About() {
    return _("section", {id: "about"},
        _("h2", "About:"),
        _("p",
            "Created By: Alex Malotky",
            _("br"),
            _("a", {target:"_blank", href:"https://github.com/Malotkya/PhasmophobiaHelper"},
                "Github Repo"
            ),
            _("br"),
            _("a", {target: "_blank", href: "https://Alex.Malotky.net/Portfolio"}, 
                "My Other Work"
            )
        )
    )
}