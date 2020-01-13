export default {};
// 这样扩展了 18.文件里就可以不用再声明 interface String 这些了
declare global{
    interface String {
        double():string;
    }
    interface Window{
        myname:string
    }
}
