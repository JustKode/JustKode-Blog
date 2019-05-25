FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend

ADD requirement.txt /backend/
RUN pip install -r requirement.txt
ADD . /backend/

EXPOSE 8000