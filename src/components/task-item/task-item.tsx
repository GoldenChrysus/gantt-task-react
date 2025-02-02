import React, { useEffect, useRef } from "react";
import { BarTask } from "../../types/bar-task";
import { GanttContentMoveAction } from "../../types/gantt-task-actions";
import { Bar } from "./bar/bar";
import { BarSmall } from "./bar/bar-small";
import { Milestone } from "./milestone/milestone";
import { Project } from "./project/project";
import style from "./task-list.module.css";
import { Theme } from '../../types/public-types';

export type TaskItemProps = {
  task: BarTask;
  arrowIndent: number;
  taskHeight: number;
  isProgressChangeable: boolean;
  isDateChangeable: boolean;
  isDelete: boolean;
  isSelected: boolean;
  rtl: boolean;
  onEventStart: (
    action: GanttContentMoveAction,
    selectedTask: BarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any;
  theme: Theme;
};

export const TaskItem: React.FC<TaskItemProps> = props => {
  const {
    task,
    arrowIndent,
    isDelete,
    taskHeight,
    rtl,
    onEventStart,
    theme,
  } = {
    ...props,
  };
  const textRef = useRef<SVGTextElement>(null);
  const task_item = useRef<React.FC<TaskItemProps>>(Milestone);
  const text_inside = textRef.current && textRef.current.getBBox().width < task.x2 - task.x1;

  useEffect(() => {
    switch (task.typeInternal) {
      case "milestone":
        task_item.current = Milestone;
        break;
      case "project":
        task_item.current = Project;
        break;
      case "smalltask":
        task_item.current = BarSmall;
        break;
      default:
        task_item.current = Bar;
        break;
    }
  }, [task.typeInternal]);

  const getX = () => {
    const width = task.x2 - task.x1;
    const hasChild = task.barChildren.length > 0;

    if (text_inside) {
      return task.x1 + width * 0.5;
    }

    if (rtl && textRef.current) {
      return (
        task.x1 -
        textRef.current.getBBox().width -
        arrowIndent * +hasChild -
        arrowIndent * 0.2
      );
    } else {
      return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    }
  };

  return (
    <g
      onKeyDown={e => {
        switch (e.key) {
          case "Delete": {
            if (isDelete) onEventStart("delete", task, e);
            break;
          }
        }
        e.stopPropagation();
      }}
      onMouseEnter={e => {
        onEventStart("mouseenter", task, e);
      }}
      onMouseLeave={e => {
        onEventStart("mouseleave", task, e);
      }}
      onDoubleClick={e => {
        onEventStart("dblclick", task, e);
      }}
      onClick={e => {
        onEventStart("click", task, e);
      }}
      onFocus={() => {
        onEventStart("select", task);
      }}
    >
      {React.createElement(task_item.current, props)}
      <text
        x={getX()}
        y={task.y + taskHeight * 0.5}
        className={
          text_inside
            ? style.barLabel
            : `${style.barLabel} ${style.barLabelOutside} ${style[`barLabelOutside-${theme}`]}`
        }
        ref={textRef}
      >
        {task.name}
      </text>
    </g>
  );
};
