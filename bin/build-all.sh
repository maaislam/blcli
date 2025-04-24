cd ../clients;

for x in `ls`
do
  ls $x
  experiments=`ls $x`;

  for y in $experiments
  do 
    gulp scripts --clientname="$x" --foldername="$y" --es6
    echo "$x $y"
  done
done

