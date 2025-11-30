import { Position,Handle } from "@xyflow/react";
import type { TradingMetadataForActions } from "@/lib/types"; 

export function Lighter({data} : {
    data : {
        metadata : TradingMetadataForActions
    }
}){
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 14px',
            borderRadius: 8,
            background: '#0b1220',
            color: '#e6eef8',
            boxShadow: '0 4px 10px rgba(2,6,23,0.6)',
            minWidth: 240,
            fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
        }}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <div style={{fontSize: 12, color: '#9fb0d4', textTransform: 'uppercase', letterSpacing: 0.6}}>Lighter Trade</div>
            <div style={{display: 'flex', gap: 10, alignItems: 'baseline'}}>
                <div style={{fontWeight: 700, fontSize: 14}}>{data.metadata.type}</div>
                <div style={{fontSize: 13, color: '#cfe6ff'}}>{data.metadata.qty}</div>
            </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center'}}>
            <Handle type="target" position={Position.Left} id="lighter-input" />
            <Handle type="source" position={Position.Right} id="lighter-output" />
            </div>
        </div>
    )
}