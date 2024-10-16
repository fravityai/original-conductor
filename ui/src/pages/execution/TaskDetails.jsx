import { useState } from "react";
import { Tabs, Tab, Paper } from "../../components";
import Timeline from "./Timeline";
import TaskList from "./TaskList";
import { makeStyles } from "@material-ui/styles";
import { WorkflowVisualizer } from "orkes-workflow-visualizer";

const useStyles = makeStyles({
  taskWrapper: {
    overflowY: "auto",
    padding: 30,
    height: "100%",
  },
});

export default function TaskDetails({
  execution,
  dag,
  selectedTask,
  setSelectedTask,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  return (
    <div className={classes.taskWrapper}>
      <Paper>
        <Tabs value={tabIndex} contextual>
          <Tab label="Diagram" onClick={() => setTabIndex(0)} />
          <Tab label="Task List" onClick={() => setTabIndex(1)} />
          <Tab label="Timeline" onClick={() => setTabIndex(2)} />
        </Tabs>

        {tabIndex === 0 && (
          <WorkflowVisualizer
            maxHeightOverride
            pannable
            zoomable
            zoom={0.7}
            data={dag?.execution}
            executionMode={true}
            onClick={(e, data) => setSelectedTask({ ref: data?.id })}
          />
        )}
        {tabIndex === 1 && (
          <TaskList
            workflowId={execution.workflowId}
            selectedTask={selectedTask}
            tasks={execution.tasks}
            dag={dag}
            onClick={setSelectedTask}
          />
        )}
        {tabIndex === 2 && (
          <Timeline
            selectedTask={selectedTask}
            tasks={execution.tasks}
            dag={dag}
            onClick={setSelectedTask}
          />
        )}
      </Paper>
    </div>
  );
}
