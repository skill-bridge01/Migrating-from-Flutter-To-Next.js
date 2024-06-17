type Props = {
  handleConsultation1: () => void;
  handleConsultation2: () => void;
  handleConsultation3: () => void;
  handleConsultation4: () => void;
  handleConsultation5: () => void;
  handleConsultation6: () => void;
  handleConsultation7: () => void;
  handleConsultation8: () => void;
  handleConsultation9: () => void;
  handleConsultation10: () => void;
  handleConsultation11: () => void;
  handleConsultation12: () => void;
  handleConsultation13: () => void;
  handleConsultation14: () => void;
  handleConsultation15: () => void;
  handleConsultation16: () => void;
};
export default function MenuItems({
  handleConsultation1,
  handleConsultation2,
  handleConsultation3,
  handleConsultation4,
  handleConsultation5,
  handleConsultation6,
  handleConsultation7,
  handleConsultation8,
  handleConsultation9,
  handleConsultation10,
  handleConsultation11,
  handleConsultation12,
  handleConsultation13,
  handleConsultation14,
  handleConsultation15,
  handleConsultation16,
}: Props) {
  return (
    <>
      <div className={"hidden 3xl:flex 3xl:flex-col gap-3"}>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-[300px]"
              src="/assets/images/0.png"
              onClick={handleConsultation1}
            />
            <p className="px-1">カウンセリングチャットAI相談</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-[300px]"
              src="/assets/images/1.png"
              onClick={handleConsultation2}
            />
            <span className="px-1">人間関係についてのカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/2.png"
              onClick={handleConsultation3}
            />
            <span className="px-1">
              ワークライフバランスについてのカウンセリング
            </span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/3.png"
              onClick={handleConsultation4}
            />
            <span className="px-1">
              技術・スキルの不足についてのカウンセリング
            </span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/4.png"
              onClick={handleConsultation5}
            />
            <p className="px-1">変化への対応方法についてのカウンセリング</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/5.png"
              onClick={handleConsultation6}
            />
            <span className="px-1">
              リーダーシップを身につけるカウンセリング
            </span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/6.png"
              onClick={handleConsultation7}
            />
            <span className="px-1">やりがいを見つけるカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/9.png"
              onClick={handleConsultation8}
            />
            <span className="px-1">家族関係についてのカウンセリング</span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/10.png"
              onClick={handleConsultation9}
            />
            <p className="px-1">睡眠についてのカウンセリング</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/11.png"
              onClick={handleConsultation10}
            />
            <span className="px-1">コーチングセッション</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/12.png"
              onClick={handleConsultation11}
            />
            <span className="px-1">認知再構成のカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/13.png"
              onClick={handleConsultation12}
            />
            <span className="px-1">露出療法のカウンセリング</span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/14.png"
              onClick={handleConsultation13}
            />
            <p className="px-1">振り返りとホームワークのカウンセリング</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/15.png"
              onClick={handleConsultation14}
            />
            <span className="px-1">問題解決技法のカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/16.png"
              onClick={handleConsultation15}
            />
            <span className="px-1">リラクゼーション技法のカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/17.png"
              onClick={handleConsultation16}
            />
            <span className="px-1">自己指示的対話のカウンセリング</span>
          </div>
        </div>
      </div>

      <div className={"3xl:hidden flex flex-col gap-3"}>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/0.png"
              onClick={handleConsultation1}
            />
            <p className="px-1">カウンセリングチャットAI相談</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/1.png"
              onClick={handleConsultation2}
            />
            <span className="px-1">人間関係についてのカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/2.png"
              onClick={handleConsultation3}
            />
            <span className="px-1">
              ワークライフバランスについてのカウンセリング
            </span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/3.png"
              onClick={handleConsultation4}
            />
            <span className="px-1">
              技術・スキルの不足についてのカウンセリング
            </span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/4.png"
              onClick={handleConsultation1}
            />
            <p className="px-1">変化への対応方法についてのカウンセリング</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/5.png"
              onClick={handleConsultation2}
            />
            <span className="px-1">
              リーダーシップを身につけるカウンセリング
            </span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/6.png"
              onClick={handleConsultation3}
            />
            <span className="px-1">やりがいを見つけるカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/9.png"
              onClick={handleConsultation4}
            />
            <span className="px-1">家族関係についてのカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/10.png"
              onClick={handleConsultation1}
            />
            <p className="px-1">睡眠についてのカウンセリング</p>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/11.png"
              onClick={handleConsultation2}
            />
            <span className="px-1">コーチングセッション</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/12.png"
              onClick={handleConsultation3}
            />
            <span className="px-1">認知再構成のカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/13.png"
              onClick={handleConsultation4}
            />
            <span className="px-1">露出療法のカウンセリング</span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/14.png"
              onClick={handleConsultation1}
            />
            <p className="px-1">振り返りとホームワークのカウンセリング</p>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/15.png"
              onClick={handleConsultation2}
            />
            <span className="px-1">問題解決技法のカウンセリング</span>
          </div>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-72"
              src="/assets/images/16.png"
              onClick={handleConsultation3}
            />
            <span className="px-1">リラクゼーション技法のカウンセリング</span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <div
            className={
              "bg-white drop-shadow-5xl cursor-pointer hover:drop-shadow-4xl"
            }
          >
            <img
              className="w-40"
              src="/assets/images/17.png"
              onClick={handleConsultation4}
            />
            <span className="px-1">
              <span>自己指示的対話のカウンセ</span>
              <br />
              <span>リング</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
