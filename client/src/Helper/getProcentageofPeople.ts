import { Label } from "reactstrap";
import React, { useState, useEffect } from "react";

const useProcentageofPeopleHook = (data: any) => {
  //convert data to citys array string
  const Cities = data.map((item: any) => {
    return item.address.city;
  });

  //get uniq city and sort by abc
  const uniqCity:any = Array.from(new Set(Cities)).sort();

  //count number of same city
  const getOccurrence = (array: string[], value: string) => {
    var count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  };

  // create array Where is a information about percentage of people by city
  const Population = uniqCity.map((value: string) => {
    return {
      cityName: value,
      populationProcentage: Math.floor(
        getOccurrence(Cities, value) / (Cities.length / 100)
      ),
    };
  });

  return [Population];
};

export default useProcentageofPeopleHook;
