cd ../clients;

for x in `ls`
do
  experiments=`ls $x`;

  for y in $experiments
  do 
    if test -f ./$x/$y/dist/min/*.min.js; then
      size=`du -b ./$x/$y/dist/min/*.min.js`

      echo -e "$x\t$y\t$size"
    fi
  done
done

