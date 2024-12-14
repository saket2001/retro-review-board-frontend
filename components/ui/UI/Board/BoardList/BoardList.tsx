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
  const hasBoardItems = props.dataList?.length > 0 ? true : false;

  return (
    <section className={`px-3 py-2 ${props.extraStyles}`}>
      <Heading variant="h1" extraStyles="px-2 py-1" title={props.listHeading} />

      <div className="flex flex-col gap-y-1 p-2">
        {hasBoardItems &&
          props?.dataList?.map((item: IBoardItem) =>

            <BoardItem key={item.Id}
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