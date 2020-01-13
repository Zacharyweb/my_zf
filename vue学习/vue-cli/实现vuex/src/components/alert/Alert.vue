<template>
    <div>
        <div class="alert_wrapper">
            <transition name="mask">
                <div class="alert_mask" v-if="options"></div>
            </transition>
            <transition name="alert">
                <div class="alert_modal" v-if="options">
                    <div class="modal_header">
                        <span @click="cancel">×</span>
                    </div>
                    <div class="modal_body">{{options.content}}</div>
                    <div class="modal_footer">
                        <span class="btn_item" @click="confirm">确定</span>
                        <span class="btn_item" @click="cancel">取消</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name:'Alert',
    data(){
        return {
            options:null
        }
    },
    methods:{
        show(options){
            this.options = options;
        },
        close(){
           this.options = null;
        },
        confirm(){
            if(this.options.confirm && typeof this.options.confirm == 'function'){
                this.options.confirm();
            };
            this.close();
        },
        cancel(){
            if(this.options.cancel && typeof this.options.cancel == 'function'){
                this.options.cancel();
            };
            this.close();
        }
    }  
}
</script>
<style lang="less" scoped>
    .alert_wrapper{
        .alert_mask{
            position: fixed;
            top:0;
            left: 0;
            right: 0;
            bottom:0;
            background-color: rgba(0, 0, 0, 0.6);
        }

        .mask-enter-active{
            transition: all 0.3s linear;
            opacity: 0;
        }
        .mask-enter-to{
            opacity: 1;
        }
        .mask-leave{
    
        }
        .mask-leave-active{
            transition: all 0.3s linear;
            opacity: 1;
        }
        .mask-leave-to{
            opacity: 0;
        }

        .alert_modal{
            position: fixed;
            top:30%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            width: 240px;
            border-radius: 4px;
        }
        .alert-enter{
           
        }
        .alert-enter-active{
            transition: all 0.3s linear;
            opacity: 0;
            top:20%;
        }
        .alert-enter-to{
            opacity: 1;
            top:30%;
        }
        .alert-leave{
    
        }
        .alert-leave-active{
            transition: all 0.3s linear;
            opacity: 1;
            top:30%;
        }
        .alert-leave-to{
            opacity: 0;
            top:20%;
        }

        .modal_header{
            padding:5px 15px;
            display: flex;
            justify-content: flex-end; 
            // border-bottom: 1px solid #eee;
            span{
                color: #999;
                font-size: 24px;
            }
        }
        .modal_body{
           padding:10px;
           padding-bottom: 20px;
           font-size: 14px;
           color: #666;
           line-height: 1.5;
           white-space: wrap;
           word-break: break-all;
           text-align: center;
        }
        .modal_footer{
            display: flex;
            border-top: 1px solid #eee;
            .btn_item{
                flex: 1;
                height: 36px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                &+.btn_item{
                    border-left:  1px solid #eee;
                }
            }
        }
    }

</style>