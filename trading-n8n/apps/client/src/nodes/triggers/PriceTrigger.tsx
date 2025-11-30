import { Handle, Position } from "@xyflow/react";
import type { PriceMetadata } from "../../../../../packages/common/src";


const PriceTrigger = ({data,isConnectable} : {
    data : {
        metadata : PriceMetadata
    },
    isConnectable : boolean
}) => {
  return (
    <div style={{padding:10, border: '1px solid #777', borderRadius: 5, backgroundColor: '#f0f0f0', minWidth: 150, textAlign: 'center'}}>
        {data.metadata.asset}
        {data.metadata.price}
        <Handle position={Position.Right} type="source" id="timer-output" />
    </div>
  )
}

export default PriceTrigger