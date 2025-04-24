Create a test: gulp experiment-create --cn=KeyGroup --fn=KG-test
Launch a test: gulp --cn=KeyGroup --fn=KG-test--variation=1
Launch a test: gulp --cn= --fn= --variation=1
Duplicate a test: gulp experiment-duplicate--scn=<source client name> --sfn=<source folder name> --cn=<target client name> --fn=<target folder name>

#######Git########

"##Guide to use multiple Git
###Set SSH Key
cd ~/.ssh
ssh-keygen -o -t rsa -C ""specifier_name/email/etc""
ssh -T git@github.com

###Command to set environment
git remote -v
git remote set-url origin git@github.com:username/your-repository.git
git config user.email gazisalahuddin@outlook.com
git config user.name Salahuddin-Gazi
git add .
git commit -m ""messages""
git pull
git push -u origin master"
