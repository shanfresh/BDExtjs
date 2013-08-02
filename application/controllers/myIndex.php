<?
//$filename="/home/worK/lamp/apache/htdocs/FirstTry/tmp/tieba-ocr-pic_2013-08-02-14-32-00_.txt";
$file = fopen("/home/work/lamp/apache/htdocs/FirstTry/tmp/shan.txt","r") or exit("Unable to open file!");
$arr=array();
$line=0;
while(!feof($file))
{
        $eachline=fgets($file);
        $eachLineArray=array();
        $lastPosition=0;
        $newPosition=-1;
        for($i=0;$i<2;$i++){
                $newPosition=stripos($eachline,' ',$lastPosition);
                echo "line:".$line." Col:".$i."_".$newPosition."_"."\n";
                $eachWord=substr($eachline,$lastPosition,$newPosition-$lastPosition);
                array_push($eachLineArray, $eachWord);
                $lastPosition=$newPosition+1;
        }
        $endWord=substr($eachline,$lastPosition);
        $temp=array();
        $temp['Name']=$eachLineArray[0];
        $temp['Type']=$eachLineArray[1];
        $temp['Value']=trim($endWord);
        array_push($arr, $temp);
$line++;
}
print("~~~~~~~~~~~~");
print_r("$arr");
fclose($file);
?>