# Setup

If you are using mac, setup your environment by executing the following commands.

Brew

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Python and OpenCV

```
$ brew install python
$ brew install python3
$ brew install opencv
```

Create virtualenv project

```
$ cd ~/Documents
$ mkdir python
$ cd python
$ python3 -m venv digits_recognition
$ source digits_recognition/bin/activate
```

Install Python packages

```
(digits_recognition) $ pip install numpy tensorflow Flask
(digits_recognition) $ ln -s /usr/local/lib/python3.6/site-packages/cv2.cpython-36m-darwin.so ~/Documents/python/digits_recognition/lib/python3.6/site-packages/cv2.cpython-36m-darwin.so
```
