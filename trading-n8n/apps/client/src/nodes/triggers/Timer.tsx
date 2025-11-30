import { Handle, Position } from "@xyflow/react";
import type { TimerMetadata } from "../../../../../packages/common/metadata";

const Timer = ({data,isConnectable} : {
    data : {
        metadata : TimerMetadata
    },
    isConnectable : boolean
}) => {
  return (
    <div style={{padding:10, border: '1px solid #777', borderRadius: 5, backgroundColor: '#f0f0f0', minWidth: 150, textAlign: 'center'}}>
        {data.metadata.time}
        <Handle position={Position.Right} type="source" id="timer-output" />
    </div>
  )
}

export default Timer