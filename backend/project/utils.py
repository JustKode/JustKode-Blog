import time


def getfilename(filename):
    return str(time.time())[-10:] + filename
