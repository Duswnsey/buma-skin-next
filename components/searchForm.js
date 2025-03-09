"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SearchForm() {
    const router = useRouter();
    const [show, setshow] = useState("dropdown");
    const [searchText, setsearchText] = useState("");
    const on_change_search = (e) => {
        e.preventDefault()
        setsearchText(e.target.value)
    }
    return (
        <form onSubmit={(e) => {e.preventDefault()}}>
            <style jsx>{`
                .fullWidth {
                    width: 100%;
                }
            `}</style>
            <div className={"fullWidth "+show}>
                <div className="fullWidth dropdown-trigger">
                    <div className="field has-addons">
                        <div className="control has-icons-left is-expanded">
                            <input
                                className="input is-primary"
                                onChange={on_change_search}
                                type="text"
                                autoComplete="off"
                                placeholder="검색"
                            />
                            <span className="icon is-small is-left has-text-primary">
                                <span className="fas fa-search" />
                            </span>
                        </div>
                        <div className="control">
                            <a href="#" className="button is-primary is-outlined)" onClick={(e) => {e.preventDefault(); gotodoc(searchText)}}>
                                <span className="icon">
                                <span className="fas fa-search" />
                                </span>
                            </a>
                        </div>
                        <div className="control">
                            <a href="#" className="button is-primary is-outlined" onClick={(e) => {e.preventDefault(); random()}}>
                                <span className="icon">
                                <span className="fas fa-random" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="dropdown-menu">
                <div className="dropdown-content">
                    <a
                        className="dropdown-item.is-active"
                        onClick={(e) => {e.preventDefault()}}
                    >
                        searchitem
                    </a>
                </div>
            </div>
            </div>
        </form>
    )
    function gotodoc(searchText) {
        if (searchText == undefined) return;
        router.push('/Go?q=' + encodeURIComponent(this.searchText));
    }
    function random() {
        router.push('/randompage');
    }
}