#!/bin/bash

#
#infinit loop sends measured data to server as a post request. Data is a String with json format. 
#script takes integer argument that specify after how many seconds a new http request with sensor data is sent to the server 
#sensor is not able to measure in periods of less than one second
#

server="192.168.178.55"
seconds=$1
seconds+="s"
echo $seconds
while :
do
	curl --header "Content-Type: application/json"   --request POST   --data "$(python measure_data.py)"   http://$server:3000/
	sleep $seconds
done

