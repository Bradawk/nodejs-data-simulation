var spareRandom = null;

/**
 * Return a random value fitting a normal distribution
 */
function normalRandom()
{
	var val, u, v, s, mul;

	if(spareRandom !== null)
	{
		val = spareRandom;
		spareRandom = null;
	}
	else
	{
		do
		{
			u = Math.random()*2-1;
			v = Math.random()*2-1;

			s = u*u+v*v;
		} while(s === 0 || s >= 1);

		mul = Math.sqrt(-2 * Math.log(s) / s);

		val = u * mul;
		spareRandom = v * mul;
	}
	
	return val / 14;	// 7 standard deviations on either side
}

/**
 * Return a random value between min and max fitting a normal distribution
 * @param {Float} min
 * @param {Float} min
 */
exports.normalRandomInRange = function(min, max)
{
	var val;
	do
	{
		val = normalRandom();
	} while(val < min || val > max);
	
	return val;
}

exports.normalRandomScaled = function (mean, stddev)
{
	var r = normalRandomInRange(-1, 1);

	r = r * stddev + mean;

	return Math.round(r);
}

exports.lnRandomScaled = function (gmean, gstddev)
{
	var r = normalRandomInRange(-1, 1);

	r = r * Math.log(gstddev) + Math.log(gmean);

	return Math.round(Math.exp(r));
}
