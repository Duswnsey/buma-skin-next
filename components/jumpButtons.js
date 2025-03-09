import { useEffect } from "react";

export default function JumpButtons (props) {
    function goUp() {
        if (typeof window !== 'undefined') {
          const topAnchor = document.querySelector('.top-anchor');
          if (topAnchor) {
            topAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    
      // 아래로 스크롤하는 함수
      function goDown() {
        if (typeof window !== 'undefined') {
          const footer = document.querySelector('footer');
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }
      }
    return (
        <>
            <style jsx>{`
                .jump-buttons {
                    position: fixed;
                    bottom: 10px;
                    right: 10px;
                }

                .jump-buttons ul {
                    list-style-type: none;
                }

                .jump-buttons ul li {
                    cursor: pointer;
                    display: inline-block;
                    background: #00d1b2;
                    border: 1px solid #00c0a3;
                    font-size: 30px;
                    text-align: center;
                    color: white;
                    width: 50px;
                    height: 45px;
                }

                .jump-buttons ul li:hover {
                    background: #00917b;
                }

                .jump-buttons ul li:first-child {
                    border-radius: 5px 0px 0px 5px;
                }

                .jump-buttons ul li:last-child {
                    border-radius: 0px 5px 5px 0px;
                }
            `}</style>
            {props.data.user.setting.BumaEnableJumpButtons != false && (
                <div className="jump-buttons">
                    <ul>
                        <li onClick={() => {goUp()}}>
                            <div className="jump-up icon" title="위로 이동">
                                <span className="fas fa-arrow-up" />
                            </div>
                        </li>
                        <li onClick={() => {goDown()}}>
                            <div className="jump-down icon" title="아래로 이동">
                                <span className="fas fa-arrow-down" />
                            </div>
                        </li>
                    </ul>
                </div> 
            )}
        </>
    )
}
