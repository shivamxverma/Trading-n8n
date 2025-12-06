import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
})

const EdgesSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    source : {
        type : String,
        required : true
    },
    target : {
        type : String,
        required : true
    }
},{
    _id : false
})

const PositionSchema = new Schema({
    x : {
        type : Number,
        required : true
    },
    y : {
        type : Number,
        required : true
    }
},{
    _id : false
})

const CredentialsTypeSchema = new Schema({
    title : {type : String,required : true},
    required : {type: Boolean,required : true}
});

const NodesSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    position: PositionSchema,
    credentials: [CredentialsTypeSchema],
    type : {
        type : Schema.Types.ObjectId,
        ref : 'Nodes'
    },
    data : {
        kind : String,
        enum : ["ACTION","TRIGGER"],
        metadata : Schema.Types.Mixed
    }
})

const ExecutionSchema = new Schema({
    workflowId: {
        type: mongoose.Types.ObjectId,
        required : true,
        ref : "workflow"
    },
    status : {
        type : String,
        enum : ["PENDING","SUCCESS","FAILURE"]
    }
})


const WorkflowSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Users'
    },
    nodes : [],
    edges : []
})

export const UserModel = mongoose.model("Users",UserSchema);
export const WorkflowModel = mongoose.model("Workflows",WorkflowSchema);
export const NodesModel = mongoose.model("Nodes",NodesSchema);
export const ExecutionModel = mongoose.model("Executions",ExecutionSchema);