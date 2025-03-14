"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import BDropdown from "./components/b-dropdown";
import SearchForm from "./components/searchForm";
import './css/layout.min.css';
import './css/bulma.min.css';
import BNotification from "./components/b-notification";
import { useRouter } from "next/navigation";
import JumpButtons from "./components/jumpButtons";
import SkinLicense from "./components/skinLicense";
import dynamic from "next/dynamic";
export default function skin (props) {
    const Defaultcomponent=dynamic(() => import(`@/defaultcomponents/${props.data.action}`),{ssr:false})
    const router = useRouter()
    useEffect(() => {
        if (props.data.user.setting.theme != undefined) {
            changeTheme(props.data.user.setting.theme);
        } else if (props.data.config.theme != undefined) {
            changeTheme(props.data.config.theme);
        } else {
            changeTheme("dark")
        }
    }, [])
    const [isNavbarActive, setisNavbarActive] = useState(false)
    let stared = "";
    if (props.data.actiontype != undefined) {
        if (props.data.stared == true) {
            stared = "stared"    
        }
    }
    return (
        <div className="buma">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
            <div className="top-anchor"></div>
            <nav className="nav navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/" className="navbar-item">{process.env.NEXT_PUBLIC_WIKI_NAME}</Link>
                    <a className={isNavbarActive == true ? ("navbar-burger is-active") : ("navbar-burger")} onClick={(e) => {e.preventDefault(); toggleNavbarBurger()}}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
                <div className={isNavbarActive == true ? ("navbar-menu is-active") : ("navbar-menu")} id="mainNavbar">
                    <div className="navbar-start">
                        <Link href="/RecentChanges" className="navbar-item">
                            <span className="icon">
                                <span className="fas fa-binoculars" />
                            </span>&nbsp;
                            최근 변경
                        </Link>
                        <Link href="/RecentChanges" className="navbar-item">
                                <span className="icon"> <span className="far fa-comments" /> </span>&nbsp;
                                최근 토론
                        </Link>
                        <BDropdown icon="fas fa-cogs" label="도구">
                            <Link className="navbar-item" href="/NeededPages">
                                <span className="icon"> <span className="fas fa-beer" /> </span>&nbsp;
                                작성이 필요한 문서
                            </Link>
                            <Link className="navbar-item" href="/OrphanedPages">
                                <span className="icon"> <span className="far fa-frown" /> </span>&nbsp;
                                고립된 문서
                            </Link>
                            <Link className="navbar-item" href="/OrphanedCategories">
                                <span className="icon"> <span className="far fa-frown" /> </span>&nbsp;
                                고립된 분류
                            </Link>
                            <Link className="navbar-item" href="/UncategorizedPages">
                                <span className="icon">
                                    <span className="far fa-question-circle" /> </span
                                >&nbsp; 분류가 되지 않은 문서
                            </Link>
                            <Link className="navbar-item" href="/OldPages">
                                <span className="icon"> <span className="fas fa-pause" /> </span>&nbsp;
                                편집된 지 오래된 문서
                            </Link>
                            <Link className="navbar-item" href="/ShortestPages">
                                <span className="icon"> <span className="far fa-thumbs-down" /> </span
                                >&nbsp; 내용이 짧은 문서
                            </Link>
                            <Link className="navbar-item" href="/LongestPages">
                                <span className="icon"> <span className="far fa-thumbs-up" /> </span
                                >&nbsp; 내용이 긴 문서
                            </Link>
                            <Link className="navbar-item" href="/BlockHistory">
                                <span className="icon"> <span className="fas fa-ban" /> </span>&nbsp; 차단
                                내역
                            </Link>
                            <Link className="navbar-item" href="/randompage">
                                <span className="icon"> <span className="fas fa-random" /> </span>&nbsp;
                                RandomPage
                            </Link>
                            <Link className="navbar-item" href="/Upload">
                                <span className="icon"> <span className="fas fa-cloud-upload-alt" /> </span
                                >&nbsp; 파일 올리기
                            </Link>
                            <Link className="navbar-item" href="/license">
                                <span className="icon"> <span className="far fa-copyright" /> </span
                                >&nbsp; 라이선스
                            </Link>
                            {props.data.user.isRegistered == true && (
                                props.data.user.setting.Buma_menus != undefined && (
                                    props.data.user.setting.Buma.menus.map((m) => {
                                        return (<Link href={m.l} key={m.l} className="navbar-item">
                                            <span className="icon"> <span className="far fa-heart" /> </span>&nbsp; 
                                        {m.t}</Link>)
                                    })
                                )
                            )}
                        </BDropdown>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item is-hidden-touch">
                            <SearchForm />
                        </div>
                        {props.data.user.isRegistered == true ? (
                            <BDropdown rightDropdown={true} icon="fas fa-user" label={props.data.user.name}>
                                <a href="/preference" className="navbar-item">
                                    <span className="icon"> <span className="fas fa-wrench" /> </span
                                    >&nbsp; 환경 설정
                                </a>
                                <Link href="/member/mypage" className="navbar-item">
                                    <span className="icon">
                                        <span className="far fa-user-circle" /> </span
                                    >&nbsp; 내 정보
                                </Link>
                                <Link href={`/w/사용자:${props.data.user.name}`} className="navbar-item">
                                    <span className="icon">
                                        <span className="far fa-sticky-note" /> </span
                                    >&nbsp; 내 사용자 문서
                                </Link>
                                <div className="navbar-divider"></div>
                                <Link href={`/contribute/doc/${props.data.user.name}`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-alt" /> </span
                                    >&nbsp; 내 문서 기여 목록
                                </Link>
                                <Link href={`/contribute/talk/${props.data.user.name}`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-contract" /> </span
                                    >&nbsp; 내 토론 기여 목록
                                </Link>
                                <Link href={`/contribute/PR/${props.data.user.name}`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-contract" /> </span
                                    >&nbsp; 내 편집 요청 기여 목록
                                </Link>
                                <Link href="/member/starred_documents" className="navbar-item">
                                    <span className="icon"> <span className="fas fa-bookmark" /> </span
                                    >&nbsp; 별찜한 문서
                                </Link>
                                <div className="navbar-divider"></div>
                                <Link href={`/logout/${encodeURIComponent(process.env.NEXT_PUBLIC_FRONTPAGE)}`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-sign-out-alt" /> </span
                                    >&nbsp; 로그아웃
                                </Link>
                            </BDropdown>
                        ) : (
                            <BDropdown right-dropdown={true} icon="fas fa-user-secret" label="익명">
                                <a href="/preference" className="navbar-item">
                                    <span className="icon"> <span className="fas fa-wrench" /> </span
                                    >&nbsp; 환경 설정
                                </a>
                                <Link href={`/contribute/docip/test`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-alt" /> </span
                                    >&nbsp; 내 문서 기여 목록
                                </Link>
                                <Link href={`/contribute/talkip/test`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-contract" /> </span
                                    >&nbsp; 내 토론 기여 목록
                                </Link>
                                <Link href={`/contribute/PRip/test`} className="navbar-item">
                                    <span className="icon"> <span className="fas fa-file-contract" /> </span
                                    >&nbsp; 내 편집 요청 기여 목록
                                </Link>
                                <div className="navbar-divider"></div>
                                <Link href={`login/${encodeURIComponent(process.env.NEXT_PUBLIC_FRONTPAGE)}`} className="navbar-item">
                                    <span className="icon"> <span href="fas fa-sign-in-alt" /> </span
                                    >&nbsp; 로그인
                                </Link>
                            </BDropdown>
                        )}
                    </div>
                </div>
            </nav>
            <nav className="mobile-search-navbar nav navbar is-hidden-desktop">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <search-form />
                    </div>
                </div>
            </nav>
            <section
            id="wiki-main-title"
            className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">{props.data.namespace != undefined && (props.data.namespace+":")}{props.data.title}</h1>
                        <h2 className="subtitle">
                            {
                            props.data.action == "watch" ? (
                                props.bodycontent == "document not found" ? (
                                    <span> 존재하지 않는 문서입니다. 직접 자유롭게 기여해보세요! </span>
                                ) : (
                                <span>
                                    미래에 마지막으로 수정됐습니다.
                                </span>
                                )
                                
                            ) : (
                                    <span>Powered by caki</span>
                            )}
                        </h2>
                    </div>
                </div>
                <div className="hero-foot">
                    <nav className="tabs is-left is-boxed" id="wiki-article-menu">
                        <div className="container">
                            {props.data.actiontype == "document" ? (
                                <ul>
                                        <li className={props.data.action == "watch" ? ("is-active") : ("")}>
                                            <Link href={`/w/${encodeURIComponent(props.data.namespace+":"+props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-eye" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 본문</span>
                                            </Link>
                                        </li>
                                        <li className={props.data.action == "edit" ? ("is-active") : ""}>
                                            <Link href={`/edit/${encodeURIComponent(props.data.namespace+":"+props.data.title)}`} className="edit-anchor">
                                                <span className="icon">
                                                    <span className="fas fa-edit" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 편집</span>
                                            </Link>
                                        </li>
                                    {props.data.action != "talk" && props.data.action != "talks" && (
                                        <li>
                                            <Link href={`/talks/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="far fa-comments" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 토론</span>
                                            </Link>
                                        </li>
                                    )}
                                    {props.data.action != "move" && (
                                        <li>
                                            <Link href={`/move/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-arrow-right" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 이동</span>
                                            </Link>
                                        </li>
                                    )}
                                    {props.data.action != "delete" && (
                                        <li>
                                            <Link href={`/delete/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="far fa-trash-alt" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 삭제</span>
                                            </Link>
                                        </li>
                                    )}
                                    {props.data.action != "backlink" && (
                                        <li>
                                            <Link href={`/backlink/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-random" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 역링크</span>
                                            </Link>
                                        </li>
                                    )}
                                    {props.data.action != "history" && (
                                        <li>
                                            <Link href={`/history/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-history" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 력사</span>
                                            </Link>
                                        </li>
                                    )}
                                    {props.data.action != "acl" && (
                                        <li>
                                            <Link href={`/acl/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-key" />
                                                </span>
                                                <span className="wiki-article-menu-text"> ACL</span>
                                            </Link>
                                        </li>
                                    )}
                                <li className={`star-tab ${stared}`}>
                                    {stared == true ? (
                                        <Link href={`unstar/${encodeURIComponent(props.namespace)}/${encodeURIComponent(props.title)}`}>
                                            <span className="icon">
                                                <span className="fas fa-star" />
                                            </span>
                                            <span className="wiki-article-menu-text"> 별찜 해제 (</span><span className="star-count">{props.data.stars}</span><span className="wiki-article-menu-text">)</span>
                                        </Link>
                                    ) : (
                                        props.data.stars >= 0 && (
                                            <Link href={`star/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}>
                                                <span className="icon">
                                                    <span className="fas fa-star" />
                                                </span>
                                                <span className="wiki-article-menu-text"> 별찜 (</span
                                                ><span className="star-count">{props.data.stars}</span
                                                ><span className="wiki-article-menu-text">)</span>
                                            </Link>
                                        )
                                    )}
                                </li>
                                {props.data.user.isRegistered == true && (
                                    <li>
                                        <Link href={`contribute/user/${props.data.user.name}`}>
                                            <span className="icon">
                                                <span className="fas fa-chart-line" />
                                            </span>
                                            <span className="wiki-article-menu-text"> 기여 목록</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            ) : (
                                <ul>
                                    <li className="is-active">
                                <a href="#">
                                    <span className="icon">
                                        <span className="fas fa-cogs" />
                                    </span>
                                    <span className="wiki-article-menu-text"> 특수 문서</span>
                                </a>
                            </li>
                        </ul>
                            )}
                        </div>
                    </nav>
                </div>
            </section>
            <section className="section">
            <div className="container">
                {props.data.sitenotice != undefined && (
                    <BNotification color="is-warning" >
                        <span>{props.data.sitenotice}</span>
                    </BNotification>
                )}
                {props.data.user.isRegistered == true && (
                    props.data.user.opened_usrtalk != undefined && (
                        <BNotification>
                            <Link href={`talk/${props.data.user.opened_usrtalk}`}>사용자 토론</Link>이 있습니다.
                            확인해주세요.
                        </BNotification>
                    )
                )}
                

                <div className="wiki-article" onDoubleClick={doBehaviorWhenDblClick()}>
                    {props.data.hasdefault == true && (
                        <Defaultcomponent />
                    )}
                    <div className="파서님! 무서워요... 스킨님 저 믿고 뛰어 내리새요!!! 네, 알겠어요!. (휙) (꽈당) 위키에서 살아남기 제 1장. 파서를 너무 믿지 말 것." dangerouslySetInnerHTML={{ __html: props.data.bodycontent }}></div>
                    {props.data.action == "license" && (
                        <SkinLicense />
                    )}
                </div>
            </div>
        </section>
        <footer className="footer">
        <div className="container">
            <div className="content has-text-centered">
                <p>
                    {Object.entries(props.data.Footers).map(([k, v]) => {
                        return (<span key={k} id={"Footer-"+k} dangerouslySetInnerHTML={{"__html":v+"<br />"}}/>)
                    })}

                    buma-skin ported by Duswnsey, caki by enswnseid <br />
                    buma-skin is distributed under
                    <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU General Public License Version 3</a>
                </p>
            </div>
        </div>
    </footer>
    <JumpButtons data={props.data}/>
        </div>
    );
    function toggleNavbarBurger() {
        setisNavbarActive(!isNavbarActive)
    }
    function changeTheme(theme) {
        document.documentElement.dataset.theme = theme;
    }
    function doBehaviorWhenDblClick() {
        if (props.data.title == undefined) return;
        let action = ""
        if (props.data.user.setting.BumaBehaviorWhenDblClick != undefined) {
            action = props.data.user.setting.BumaBehaviorWhenDblClick
        } else if (props.data.config.BumaBehaviorWhenDblClick != undefined) {
            action = props.data.config.BumaBehaviorWhenDblClick
        } else {
            action = "skinDefault"
        }
        switch (action) {
            case 'edit':
                router.push(`/edit/${encodeURIComponent(props.data.namespace+":"+props.data.title)}`)
                break;
            case 'history':
                router.push(`/history/${encodeURIComponent(props.data.namespace+":"+props.data.title)}`)
                break;
            case 'doNothing':
            case 'skinDefault':
                break;
        }
    }
}