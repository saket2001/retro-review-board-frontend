"use client";
import { FunctionComponent } from "react";
import BoardItem from "../BoardItem/BoardItem";
import IBoardItem from "@/Interfaces/IBoardItem";
import Heading from "../../HeadingComponent/Heading";
import BoardItemInput from "../BoardItem/BoardItemInput";

interface BoardListProps {
  boardId: string | undefined,
  listHeading: string;
  extraStyles: string;
  dataList: IBoardItem[] | undefined;
  loggedInUserId: string;
  maskUserComments: boolean;
  isBoardLocked: boolean;
}

const BoardList: FunctionComponent<BoardListProps> = (props) => {
  const hasBoardItems = props?.dataList?.length > 0 ? true : false;

  return (
    <section className={`p-2 ${props.extraStyles}`}>
      <div className="flex items-center justify-start gap-1">
        <Heading variant="h1" extraStyles="p-2" title={props.listHeading} />
        <span className="px-2 py-1 text-sm font-medium rounded-full bg-gray-300">
          {props.dataList?.length}
        </span>
      </div>

      <div className="flex flex-col gap-y-3 p-3 rounded">
        {hasBoardItems && props?.dataList?.map((item: IBoardItem) =>
          <BoardItem key={item._id}
            BoardId={props?.boardId}
            data={item}
            maskUserComments={props.maskUserComments}
            boardItemCategory={props?.listHeading}
            loggedInUserId={props.loggedInUserId} />
        )}

        {!props.isBoardLocked && <BoardItemInput handleEditCommentFn={null} boardId={props.boardId} boardItemCategory={props?.listHeading} IsItemNew={true} boardItemData={null} />}
      </div>
    </section>
  );
};

export default BoardList;